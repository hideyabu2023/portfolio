import { Fragment } from "react";

export default function SkillList({ skills }: { skills: string[] }) {
  return (
    <ul className="program-word-list">
      {/* li は inline-block。旧HTMLの改行と同じく、間に空白を入れて区切り線の余白を出す */}
      {skills.map((skill) => (
        <Fragment key={skill}>
          <li>
            <span>{skill}</span>
          </li>{" "}
        </Fragment>
      ))}
    </ul>
  );
}
