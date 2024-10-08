"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { ListWCard } from "@/types";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { toast } from "sonner";
import { reorderList } from "@/actions/list-actions/reorder-list";
import { reorderCards } from "@/actions/card-actions/reorder-cards";

interface ListContainerProps {
  data: ListWCard[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderData, setOrderData] = useState(data);

  const { execute: executeReorderList } = useAction(reorderList, {
    onSuccess: () => {
      toast.success("Lists reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeReorderCards } = useAction(reorderCards, {
    onSuccess: () => {
      toast.success("Cards reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    // dropped in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // list moved
    if (type === "list") {
      const items = reorder(orderData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderData(items);
      executeReorderList({ items, boardId });
    }

    // card moved
    if (type === "card") {
      let newOrderData = [...orderData];

      const sourceList = newOrderData.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) return;

      if (!sourceList.cards) sourceList.cards = [];
      if (!destinationList.cards) destinationList.cards = [];

      // moved in same list
      if (source.droppableId == destination.droppableId) {
        const newOrderCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        newOrderCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = newOrderCards;

        setOrderData(newOrderData);
        executeReorderCards({ items: newOrderCards, boardId: boardId });
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        movedCard.listId = destination.droppableId;

        destinationList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        destinationList.cards.forEach((cards, index) => {
          cards.order = index;
        });

        setOrderData(newOrderData);
        executeReorderCards({ items: destinationList.cards, boardId: boardId });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full mb-32"
          >
            {orderData.map((list, index) => {
              return <ListItem key={list.id} index={index} list={list} />;
            })}
            {provided.placeholder}
            <ListForm/>
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
