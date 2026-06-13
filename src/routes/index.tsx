import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>BiovaCo Nexus | Innovation Holding Company</title>
        <meta name="description" content="BiovaCo Nexus builds, launches and scales the next generation of consumer brands, agricultural innovation and technology ventures. Based in India." />
      </Helmet>
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
