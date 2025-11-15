export default function Parallax({ image, children }: { image: string, children?: React.ReactNode }) {
  return (
    <section className="section relative overflow-hidden">
      <div
        className="parallax w-full h-[360px] sm:h-[400px] md:h-[500px] bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{ backgroundImage: `url(${image})` }}
      />
      {children && (
        <div className="container-narrow mt-8 px-4 mx-auto">
          {children}
        </div>
      )}
    </section>
  )
}
