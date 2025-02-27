"use client";
import { cn } from "@/lib/utils";
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AdminLessonItemSortable } from "./AdminLessonItem";
import { saveLessonMove } from "./lessons.action";
import type { AdminLessonItemType } from "./CourseLessons.query";

type AdminLessonSortableProps = {
  items: AdminLessonItemType[];
};

export const AdminLessonSortable = ({
  items: defaultItems,
}: AdminLessonSortableProps) => {
  const [items, setItems] = useState(defaultItems);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({
      activeId,
      newUpItem,
      newDownItem,
    }: {
      activeId: string;
      newUpItem: string | undefined;
      newDownItem: string | undefined;
    }) => {
      const res = await saveLessonMove({
        upItemRank: newUpItem,
        downItemRank: newDownItem,
        lessonId: activeId,
      });

      if (res?.serverError) {
        toast.error(res.serverError.serverError);
        return;
      }

      if (!res?.data) return;

      router.refresh();

      setItems((prevItems) => {
        const activeItem = prevItems.find((item) => item.id === activeId);
        if (!activeItem) return prevItems;

        if (res.data) activeItem.rank = res.data;

        return [...prevItems];
      });
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      toast.error("Something went wrong");
      return;
    }

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        const newUpItem = newItems[newIndex - 1]?.rank;
        const newDownItem = newItems[newIndex + 1]?.rank;

        mutation.mutate({
          activeId: String(active.id),
          newUpItem,
          newDownItem,
        });

        return newItems;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        disabled={mutation.isPending}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div
          className={cn("flex flex-col gap-2", {
            "opacity-50": mutation.isPending,
          })}
        >
          {items.map((lesson, index) => (
            <AdminLessonItemSortable
              index={index}
              key={lesson.id}
              lesson={lesson}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
