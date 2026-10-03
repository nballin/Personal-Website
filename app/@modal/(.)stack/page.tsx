import { StackDetail } from '@/components/details';
import { Modal } from '@/components/Modal';

export default function StackModal() {
  return (
    <Modal label="Tech stack">
      <StackDetail />
    </Modal>
  );
}
