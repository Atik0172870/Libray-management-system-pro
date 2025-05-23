
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  author?: any;
}

const AuthorModal = ({ isOpen, onClose, author }: AuthorModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nationality: "",
    birthYear: "",
    biography: ""
  });

  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name || "",
        email: author.email || "",
        nationality: author.nationality || "",
        birthYear: author.birthYear?.toString() || "",
        biography: author.biography || ""
      });
    } else {
      setFormData({
        name: "",
        email: "",
        nationality: "",
        birthYear: "",
        biography: ""
      });
    }
  }, [author]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving author:", formData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{author ? "Edit Author" : "Add New Author"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Author Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              placeholder="e.g., Stephen King, J.K. Rowling"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="author@email.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => handleChange("nationality", e.target.value)}
                placeholder="e.g., American, British"
              />
            </div>

            <div>
              <Label htmlFor="birthYear">Birth Year</Label>
              <Input
                id="birthYear"
                type="number"
                value={formData.birthYear}
                onChange={(e) => handleChange("birthYear", e.target.value)}
                placeholder="e.g., 1965"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="biography">Biography</Label>
            <Textarea
              id="biography"
              value={formData.biography}
              onChange={(e) => handleChange("biography", e.target.value)}
              rows={3}
              placeholder="Brief biography of the author"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {author ? "Update Author" : "Add Author"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthorModal;
