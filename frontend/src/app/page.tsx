import Footer from "@/components/layout/Footer";
import Hero from "@/components/layout/Hero";
import How from "@/components/layout/How";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col font-comfortaa">
      <Navbar />

      <Hero
        bgColor="bg-brand-light-purple"
        reverse={false}
        headline="One Card, Connect Them All."
        subheadline="Bring all your links, profiles, and creations together in one place.
        Share, showcase, and express yourself effortlessly."
      />
      <Hero
        bgColor="bg-brand-light-lime"
        reverse={true}
        headline="All Your Links in One Place"
        subheadline="Gather your social media, portfolio, and favorite content effortlessly with a single, shareable card."
      />
      <How />
      <Footer />
    </div>
  );
}
