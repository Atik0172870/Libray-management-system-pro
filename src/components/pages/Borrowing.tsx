
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Search, BookPlus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Borrowing = () => {
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [issueDate, setIssueDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  const members = [
    { id: "1", name: "John Doe", membershipId: "LIB001" },
    { id: "2", name: "Jane Smith", membershipId: "LIB002" },
    { id: "3", name: "Alice Johnson", membershipId: "LIB004" }
  ];

  const availableBooks = [
    { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", available: 3 },
    { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", available: 6 },
    { id: "4", title: "The Catcher in the Rye", author: "J.D. Salinger", available: 4 }
  ];

  const recentIssues = [
    {
      id: 1,
      memberName: "John Doe",
      bookTitle: "The Great Gatsby",
      issueDate: "2024-05-20",
      returnDate: "2024-06-20",
      status: "Issued"
    },
    {
      id: 2,
      memberName: "Jane Smith",
      bookTitle: "To Kill a Mockingbird",
      issueDate: "2024-05-18",
      returnDate: "2024-06-18",
      status: "Issued"
    }
  ];

  const handleIssueBook = () => {
    console.log("Issuing book:", {
      member: selectedMember,
      book: selectedBook,
      issueDate,
      returnDate
    });
    // Reset form
    setSelectedMember("");
    setSelectedBook("");
    setIssueDate(undefined);
    setReturnDate(undefined);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Issue Books</h1>
        <p className="text-gray-600 mt-1">Issue books to library members</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issue Book Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookPlus className="mr-2 h-5 w-5" />
              Issue New Book
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="member">Select Member</Label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a member" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name} ({member.membershipId})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="book">Select Book</Label>
              <Select value={selectedBook} onValueChange={setSelectedBook}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a book" />
                </SelectTrigger>
                <SelectContent>
                  {availableBooks.map((book) => (
                    <SelectItem key={book.id} value={book.id}>
                      {book.title} by {book.author} (Available: {book.available})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Issue Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !issueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {issueDate ? format(issueDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={issueDate}
                      onSelect={setIssueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Return Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !returnDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleIssueBook}
              disabled={!selectedMember || !selectedBook || !issueDate || !returnDate}
            >
              Issue Book
            </Button>
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIssues.map((issue) => (
                <div key={issue.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{issue.bookTitle}</h4>
                      <p className="text-sm text-gray-600">Member: {issue.memberName}</p>
                      <p className="text-sm text-gray-600">
                        Issued: {issue.issueDate} | Due: {issue.returnDate}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {issue.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Borrowing;
