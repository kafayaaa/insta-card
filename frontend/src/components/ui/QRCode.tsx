"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function ShareQR({ username }: { username: string }) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${username}`;

  return (
    <QRCodeCanvas
      value={url}
      size={200}
      level="H"
      includeMargin
    />
  );
}
