import TopBar from "./components/TopBar.jsx";
import Hero from "./components/Hero.jsx";
import Countdown from "./components/Countdown.jsx";
import Program from "./components/Program.jsx";
import ForWho from "./components/ForWho.jsx";
import Bonus from "./components/Bonus.jsx";
import Teacher from "./components/Teacher.jsx";
import About from "./components/About.jsx";
import Replaces from "./components/Replaces.jsx";
import Benefits from "./components/Benefits.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import Footer from "./components/Footer.jsx";
import { useAutoScrollToForm } from "./hooks/useAutoScrollToForm.js";
import { useSmoothAnchorScroll } from "./hooks/useSmoothAnchorScroll.js";

// Дата старту інтенсиву — 10 травня поточного року
const START_DATE = (() => {
  const d = new Date();
  d.setMonth(4, 25);
  d.setHours(19, 0, 0, 0);
  if (d.getTime() < Date.now()) d.setFullYear(d.getFullYear() + 1);
  return d;
})();

export default function App() {
  useSmoothAnchorScroll();
  useAutoScrollToForm("register", 2200);

  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Countdown target={START_DATE} />
        <Program />
        <ForWho />
        <Bonus />
        <Teacher />
        <About />
        <Replaces />
        <Benefits />
        <FinalCTA />
        <Countdown target={START_DATE} />
        <RegisterForm />
      </main>
      <Footer />
    </>
  );
}
