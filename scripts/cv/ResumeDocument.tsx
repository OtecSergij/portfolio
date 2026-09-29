import {
  Document,
  Link,
  Page,
  renderToBuffer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Children, Fragment, type ReactNode } from "react";

import type {
  Resume,
  ResumeInline,
  ResumeProject,
  ResumeRole,
} from "@/content/resume";

import {
  helvetica,
  helveticaWidthEm,
  prepareHelvetica,
  unencodableCharacters,
} from "./helvetica";

const separator = " · ";
const periodSeparator = " – ";
const bulletMarker = "• ";
const listSeparator = ", ";
const labelSeparator = ": ";
const noteOpen = " (";
const noteClose = ")";
const stackLabel = "Stack";
const sectionTitles = {
  summary: "Summary",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  languages: "Languages",
} as const;
const layoutLiterals = [
  separator,
  periodSeparator,
  bulletMarker,
  listSeparator,
  labelSeparator,
  noteOpen,
  noteClose,
  stackLabel,
  ...Object.values(sectionTitles),
];
const bodySize = 10;
const bulletHang =
  (helveticaWidthEm.bullet + helveticaWidthEm.space) * bodySize;
const textColor = "#111111";
const mutedColor = "#444444";

const styles = StyleSheet.create({
  page: {
    paddingVertical: "17mm",
    paddingHorizontal: "17mm",
    fontFamily: helvetica,
    fontSize: bodySize,
    lineHeight: 1.4,
    color: textColor,
  },
  name: { fontSize: 20, fontWeight: "bold", lineHeight: 1.2 },
  headline: { fontSize: 11, marginBottom: 2 },
  section: { marginTop: 12, rowGap: 8 },
  heading: {
    fontSize: 11,
    fontWeight: "bold",
    borderBottomWidth: 0.6,
    borderBottomColor: "#8a8a8a",
    paddingBottom: 1,
    marginBottom: 5,
  },
  strong: { fontWeight: "bold" },
  muted: { color: mutedColor },
  bullet: { marginTop: 2, paddingLeft: bulletHang, textIndent: -bulletHang },
  link: { color: textColor, textDecoration: "none" },
});

function Inline({ segment }: { segment: ResumeInline }) {
  if (typeof segment === "string") return segment;
  return (
    <Link src={segment.href} style={styles.link}>
      {segment.text}
    </Link>
  );
}

function inlineKey(segment: ResumeInline): string {
  return typeof segment === "string" ? segment : segment.href;
}

function Joined({ items }: { items: readonly ResumeInline[] }) {
  return items.map((item, index) => (
    <Fragment key={inlineKey(item)}>
      {index > 0 && separator}
      <Inline segment={item} />
    </Fragment>
  ));
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  const [first, ...rest] = Children.toArray(children);
  return (
    <View style={styles.section}>
      <View wrap={false}>
        <Text style={styles.heading}>{title}</Text>
        {first}
      </View>
      {rest}
    </View>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return items.map((item) => (
    <Text key={item} style={styles.bullet}>
      {bulletMarker}
      {item}
    </Text>
  ));
}

function RoleEntry({ role }: { role: ResumeRole }) {
  return (
    <View wrap={false}>
      <Text>
        <Text style={styles.strong}>
          {role.title}
          {separator}
          {role.company}
        </Text>
        {separator}
        {role.period.start}
        {periodSeparator}
        {role.period.end}
      </Text>
      {role.descriptor.map((line) => (
        <Text key={line} style={styles.muted}>
          {line}
        </Text>
      ))}
      <Bullets items={role.bullets} />
    </View>
  );
}

function ProjectEntry({ project }: { project: ResumeProject }) {
  return (
    <View wrap={false}>
      <Text>
        <Text style={styles.strong}>{project.name}</Text>
        {project.labels.map((label) => `${separator}${label}`).join("")}
      </Text>
      <Text>
        {project.links.map((link, index) => (
          <Fragment key={link.href}>
            {index > 0 && separator}
            <Inline segment={link} />
            {link.note !== undefined && `${noteOpen}${link.note}${noteClose}`}
          </Fragment>
        ))}
      </Text>
      <Bullets items={project.bullets} />
      <Text>
        <Text style={styles.strong}>
          {stackLabel}
          {labelSeparator}
        </Text>
        {project.stack.join(listSeparator)}
      </Text>
    </View>
  );
}

function ResumeDocument({ resume }: { resume: Resume }) {
  const { contacts } = resume;
  const contactLine: readonly ResumeInline[] = [
    contacts.location,
    ...(contacts.phone === null ? [] : [contacts.phone]),
    contacts.email,
    contacts.telegram,
  ];

  return (
    <Document
      title={`${resume.name} CV`}
      author={resume.name}
      subject={resume.headline.join(separator)}
      language="en"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{resume.name}</Text>
        <Text style={styles.headline}>{resume.headline.join(separator)}</Text>
        <Text>
          <Joined items={contactLine} />
        </Text>
        <Text>
          <Joined items={contacts.web} />
        </Text>
        <Text>{resume.availability}</Text>

        <Section title={sectionTitles.summary}>
          <Text>
            {resume.summary.map((segment) => (
              <Inline key={inlineKey(segment)} segment={segment} />
            ))}
          </Text>
        </Section>

        <Section title={sectionTitles.skills}>
          <View>
            {resume.skills.map((group) => (
              <Text key={group.label}>
                <Text style={styles.strong}>
                  {group.label}
                  {labelSeparator}
                </Text>
                {group.items.join(listSeparator)}
              </Text>
            ))}
          </View>
        </Section>

        <Section title={sectionTitles.experience}>
          {resume.experience.map((role) => (
            <RoleEntry
              key={`${role.company} ${role.period.start}`}
              role={role}
            />
          ))}
        </Section>

        <Section title={sectionTitles.projects}>
          {resume.projects.map((project) => (
            <ProjectEntry key={project.name} project={project} />
          ))}
        </Section>

        <Section title={sectionTitles.languages}>
          <Text>
            {resume.languages
              .map(
                (language) =>
                  `${language.name}${labelSeparator}${language.level}`,
              )
              .join(separator)}
          </Text>
        </Section>
      </Page>
    </Document>
  );
}

export function unrenderableCharacters(resume: Resume): string[] {
  return unencodableCharacters(
    [JSON.stringify(resume), ...layoutLiterals].join(""),
  );
}

export async function renderResume(resume: Resume): Promise<Buffer> {
  await prepareHelvetica();
  return renderToBuffer(<ResumeDocument resume={resume} />);
}
