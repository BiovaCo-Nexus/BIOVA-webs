import { Hero } from "@/components/home/Hero";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { CravoraShowcase } from "@/components/home/CravoraShowcase";
import { Ecosystem } from "@/components/home/Ecosystem";
import { Metrics } from "@/components/home/Metrics";
import { CareersPreview } from "@/components/home/CareersPreview";
import { Partners } from "@/components/home/Partners";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <CravoraShowcase />
      <Ecosystem />
      <Metrics />
      <CareersPreview />
      <Partners />
    </>
  );
}
