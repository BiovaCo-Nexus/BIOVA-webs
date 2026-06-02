import React, { useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SignaturePadProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

export function SignaturePad({ value, onChange, required, error }: SignaturePadProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);

  useEffect(() => {
    if (!value && sigCanvas.current && !sigCanvas.current.isEmpty()) {
      sigCanvas.current.clear();
    }
  }, [value]);

  const clear = () => {
    sigCanvas.current?.clear();
    onChange("");
  };

  const handleEnd = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      onChange(sigCanvas.current.toDataURL("image/png"));
    } else {
      onChange("");
    }
  };

  return (
    <div className="w-full flex flex-col space-y-2">
      <div
        className={`border-2 rounded-xl bg-white overflow-hidden ${error ? "border-red-500" : "border-gray-200"}`}
      >
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            className: "signature-canvas w-full h-40",
            style: { width: "100%", height: "160px" },
          }}
          onEnd={handleEnd}
        />
      </div>
      <div className="flex justify-between items-center px-1">
        <span className="text-xs text-muted-foreground">Sign above</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clear}
          className="h-6 text-xs text-muted-foreground hover:text-foreground"
        >
          Clear Signature
        </Button>
      </div>
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
}
