import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Define a generic type for form data, constrained to objects
interface ModalProps<T extends object> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  onSubmit: () => void;
}

// Use the Modal component as a generic component
export const Modal = <T extends object>({ isOpen, onClose, title, description, formData, setFormData, onSubmit }: ModalProps<T>) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Dynamically render input fields based on formData */}
          {Object.keys(formData).map((key) => (
            <Input
              key={key}
              value={formData[key as keyof T] as string} // Type-safe value handling
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [key]: e.target.value,
                })
              }
              placeholder={`Enter ${key}`}
            />
          ))}
        </div>

        <DialogFooter>
          <Button onClick={onSubmit} variant="success">
            Submit
          </Button>
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
