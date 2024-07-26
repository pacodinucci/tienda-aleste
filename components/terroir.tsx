import Image from "next/image";
import React from "react";

const TerroirSection = () => {
  return (
    <div className="pt-28">
      <div>
        <Image
          src="/chardonnay.png"
          alt="chardonnay al este"
          width={700}
          height={0}
        />
      </div>
    </div>
  );
};

export default TerroirSection;
