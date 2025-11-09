export default function Parallax({ image, children }: { image: string, children?: React.ReactNode }){
  return (
    <section className="section">
      <div className="parallax min-h-[360px]" style={{ backgroundImage: `url(${image})` }} />
      {children && <div className="container-narrow mt-8">{children}</div>}
    </section>
  )
}
