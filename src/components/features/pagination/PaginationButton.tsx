"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export type CoursePaginationButtonProps = {
  page: number;
  baseUrl: string;
};

export const PreviewButton = (props: CoursePaginationButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        const searchParams = new URLSearchParams({
          page: String(props.page - 1),
        });
        const url = `${props.baseUrl}?${searchParams.toString()}`;
        router.push(url);
      }}
    >
      Previous
    </Button>
  );
};

export const Nextbutton = (props: CoursePaginationButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        const searchParams = new URLSearchParams({
          page: String(props.page + 1),
        });
        const url = `${props.baseUrl}?${searchParams.toString()}`;
        router.push(url);
      }}
      disabled
    >
      Next
    </Button>
  );
};
