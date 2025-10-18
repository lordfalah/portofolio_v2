"use client";

import TimeLine_01 from "@/components/ui/release-time-line";
import { dataExperience } from "@/config/other.config";
import React from "react";

const AboutExperience: React.FC = () => {
  return (
    <section className="mt-20 px-6">
      <TimeLine_01 title="Timeline Experience" entries={dataExperience} />
    </section>
  );
};

export default AboutExperience;
