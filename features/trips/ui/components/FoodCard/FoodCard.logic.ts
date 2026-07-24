import { navigationService } from '@/features/core/navigation';

export const useFoodCardLogic = (tripId: string): { effects: { handleOpenModal: () => void } } => {
  const handleOpenModal = () => navigationService.toTypicalDishesModal({ tripId });

  return { effects: { handleOpenModal } };
};
