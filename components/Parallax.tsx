export default function Parallax({ image, children }: { image: string, children?: React.ReactNode }){
  return (
    <section className="section relative overflow-hidden">
      <div 
        className="w-full bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{ 
          backgroundImage: `url(${image})`,
          height: '360px',
          backgroundAttachment: window.innerWidth >= 768 ? 'fixed' : 'scroll'
        }}
      />
      {children && (
        <div className="container-narrow mt-8 px-4 mx-auto">
          {children}
        </div>
      )}
    </section>
  )
}
