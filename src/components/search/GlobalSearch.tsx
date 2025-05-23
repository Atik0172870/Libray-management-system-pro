
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - in a real app, this would come from API calls
const mockBooks = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", coverUrl: "" },
  { id: 2, title: "1984", author: "George Orwell", coverUrl: "" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", coverUrl: "" },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", coverUrl: "" },
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", coverUrl: "" },
];

const mockMembers = [
  { id: 1, name: "John Doe", email: "john.doe@email.com", membershipId: "LIB001" },
  { id: 2, name: "Jane Smith", email: "jane.smith@email.com", membershipId: "LIB002" },
  { id: 3, name: "Mike Wilson", email: "mike.wilson@email.com", membershipId: "LIB003" },
  { id: 4, name: "Alice Johnson", email: "alice.johnson@email.com", membershipId: "LIB004" },
];

const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("books");
  const navigate = useNavigate();

  const filteredBooks = mockBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMembers = mockMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.membershipId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookClick = (bookId: number) => {
    setOpen(false);
    // In a real application, navigate to the book details page
    navigate(`/books?id=${bookId}`);
  };

  const handleMemberClick = (memberId: number) => {
    setOpen(false);
    // In a real application, navigate to the member details page
    navigate(`/members?id=${memberId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[300px] justify-start">
          <Search className="mr-2 h-4 w-4" />
          <span>Search books, members...</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search books, members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full"
          />
          
          <Tabs defaultValue="books" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>
            
            <TabsContent value="books" className="max-h-[400px] overflow-y-auto space-y-1">
              {filteredBooks.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">No books found</div>
              ) : (
                filteredBooks.map((book) => (
                  <div 
                    key={book.id}
                    className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => handleBookClick(book.id)}
                  >
                    <div className="h-10 w-10 bg-gray-200 rounded flex-shrink-0"></div>
                    <div className="ml-4">
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="members" className="max-h-[400px] overflow-y-auto space-y-1">
              {filteredMembers.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">No members found</div>
              ) : (
                filteredMembers.map((member) => (
                  <div 
                    key={member.id}
                    className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => handleMemberClick(member.id)}
                  >
                    <div className="h-10 w-10 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
                      {member.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{member.membershipId}</span>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;
