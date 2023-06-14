import { Component, createSignal } from 'solid-js';

const App: Component = () => {
  const leaves = [
    {name: "Lydia", date: "2023-04-27"},
    // {name: "Pablo", date: "2023-06-1"},
    // {name: "Sergio", date: "2023-06-1"},
  ]
  const name = leaves[leaves.length - 1].name;
  const lastLeave = new Date(leaves[leaves.length - 1].date)

  const currDate = new Date();
  const differenceInTime = currDate.getTime() - lastLeave.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  const [count, setCount] = createSignal(0);

  function counterEffect() {
    const delay =  Math.floor(1000-1000*(Math.E**(-count()*Math.PI/(differenceInDays**1.7))))
    setTimeout(() => {
      setCount(count() + 1)
      if(count() < differenceInDays) {
        counterEffect();
      }
    }, delay);
  }

  counterEffect()

  return (
    <div class="bg-slate-900 h-screen w-screen p-10 xl:p-60 text-yellow-100 text-center font-mono">
        <h1 class="text-3xl xl:text-7xl">
          Días sin bajas en <span class="text-orange-600">CTIC</span>
        </h1>
        <main class="text-8xl xl:text-[20rem]">
          <strong>{count()}</strong>
        </main>
        {leaves.reverse().map((leave,index) => (
          <p class="text-3xl" style={{opacity: 1/(index + 1)}}>
            Te echaremos de menos <strong>{leave.name}</strong>
          </p>
        ))}
        
    </div>
  );
};

export default App;


