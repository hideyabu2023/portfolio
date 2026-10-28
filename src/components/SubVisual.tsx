export default function SubVisual({ title }: { title: string }) {
  return (
    <div id="sub-visual" className="flex flx-alitem-c">
      <h2 className="sv-ttl">
        <span>{title}</span>
      </h2>
    </div>
  );
}
