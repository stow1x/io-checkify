import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@heroui/react';
import { cloneElement, isValidElement } from 'react';
import { useTranslation } from 'react-i18next';

interface DeleteConfirmDialogProps {
  onConfirm: () => void;
  triggerButton: React.ReactNode;
}

export function DeleteConfirmDialog({ onConfirm, triggerButton }: DeleteConfirmDialogProps) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleConfirm = () => {
    onConfirm();
    onOpenChange();
  };

  return (
    <>
      {isValidElement(triggerButton) ? cloneElement(triggerButton, { onClick: onOpen } as any) : triggerButton}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t('deleteConfirmTitle')}
              </ModalHeader>
              <ModalBody>
                <p>{t('deleteConfirmMessage')}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  {t('cancel')}
                </Button>
                <Button color="danger" onPress={handleConfirm}>
                  {t('delete')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
