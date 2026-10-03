import { ExperienceDetail } from '@/components/details';
import { Modal } from '@/components/Modal';
import { ScrollToHash } from '@/components/ScrollToHash';

export default function ExperienceModal() {
  return (
    <Modal label="Experience">
      <ExperienceDetail />
      <ScrollToHash />
    </Modal>
  );
}
