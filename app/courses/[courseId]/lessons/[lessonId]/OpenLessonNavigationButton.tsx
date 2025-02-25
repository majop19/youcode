"use client";

import { Button } from "@/components/ui/button";
import {
  useLessonNavigationState,
  useLessonNavigationStore,
} from "@/hooks/store/ModalState-store";
import { PanelLeftOpen } from "lucide-react";

export const OpenLessonNavigationButton = () => {
  const setState = useLessonNavigationStore((s) => s.setState);
  const state = useLessonNavigationState();

  if (state === "sticky") return;

  return (
    <Button onClick={() => setState("open")} size="sm" variant="ghost">
      <PanelLeftOpen />
    </Button>
  );
};
