import React from "react";
import { Composition } from "remotion";
import "./fonts";
import { Ad } from "./Ad";
import { TOTAL } from "./theme";

export const Root: React.FC = () => (
  <Composition id="AfkarAd" component={Ad} durationInFrames={TOTAL} fps={30} width={1080} height={1920} />
);
