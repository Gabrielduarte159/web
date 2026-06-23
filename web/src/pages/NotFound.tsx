export function NotFound(){
  return(
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col">
        <h1 className="text-gray-100 font-semibold text-2xl mb-10">Ops! Essa página não existe </h1>
        <a href="/" className="flex items-center justify-center rounded-lg border text-sm font-semibold text-gray-100 text-center hover:text-green-500 transition ease-linear h-12">Voltar para o início</a>
      </div>
    </div>
  )
}