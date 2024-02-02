import { Component, createSignal } from 'solid-js';

const App: Component = () => {

  const leaves = [
    {title: "Lydia", date: "2023-04-27", memorial:"Aquí yace LydIA\n DEP"},
    {title: "Alejandro", date: "2023-5-30", memorial:"Esta en un lugar mejor, el infierno de la administración"},
    {title: "Pablo", date: "2023-06-27", memorial:"Desaparecido en combate, o en el gym"},
    {title: "Aitor", date:"2023-07-9", memorial:"El Breve\nPasó menos tiempo en CTIC que algunos clientes"},
    {title: "Sergio", date: "2023-07-14", memorial:"🐬'); DROP TABLE memorials;--🐬"},
    {title: "Dani Pacho", date:"2024-01-5", memorial:"Se quedó sin cesta por unos días"},
    {title: "Salvador Nasser", date:"2024-02-2", memorial:"Murió de ascenso.", grave:"grave_nasser.png"}
  ]
  const images = Object.values(import.meta.glob('./assets/*', { eager: true, as: 'url' }))
  console.log(images)
  const name = leaves[leaves.length - 1].title;
  const lastLeave = new Date(leaves[leaves.length - 1].date)

  const currDate = new Date();
  const differenceInTime = currDate.getTime() - lastLeave.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  const [count, setCount] = createSignal(0);

  function counterEffect() {
    const delay = Math.floor(1000-1000*(Math.E**(-count()*Math.PI/(differenceInDays**1.7))))
    setTimeout(() => {
      setCount(count() + 1)
      if(count() < differenceInDays) {
        counterEffect();
      }
    }, delay);
  }

  counterEffect()

  return (
    <>
      <div class="bg-slate-900 h-screen w-screen p-10 xl:p-60 text-yellow-100 text-center font-mono">
        <h1 class="text-3xl xl:text-7xl">
          Días sin bajas en <span class="text-orange-600">CTIC</span>
        </h1>
        <main class="text-8xl xl:text-[20rem]">
          <strong>{count()}</strong>
        </main>
        {leaves.reverse().map((leave,index) => (
          <p class="text:xl xl:text-3xl" style={{opacity: 1/(index + 1)}}>
            Te echaremos de menos <strong>{leave.title}</strong>
          </p>
        ))}
        </div>
        <div class="fixed bottom-48 grid grid-cols-12 portrait:grid-cols-6 m-20 sepia">
          {leaves.reverse().map((person,i) => (
            <div class="group relative cursor-pointer py-2">
              <div role="tooltip" class="absolute portrait:fixed portrait:bottom-28 portrait:left-1/2 portrait:transform portrait:-translate-x-1/2 left invisible group-hover:visible w-full text-center border-4 bg-slate-600 text-white px-4 mb-3 py-2 text-sm rounded-md">
                <h6 class="text-lg font-bold">{person.title}</h6>
                <p class="whitespace-pre-line">{person.memorial}</p>
              </div>
              <img src={ person.grave ? "/src/assets/custom_graves/"+person.grave : images[i%images.length]} width="256" height="256"/>
            </div>
          ))}
        </div>
    </>
  );
};

export default App;


