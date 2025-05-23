
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, BookMinus, AlertTriangle, Check } from "lucide-react";

const Returns = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const issuedBooks = [
    {
      id: 1,
      memberName: "John Doe",
      membershipId: "LIB001",
      bookTitle: "The Great Gatsby",
      isbn: "978-0-7432-7356-5",
      issueDate: "2024-05-10",
      dueDate: "2024-06-10",
      daysOverdue: 13,
      fine: 6.50,
      status: "Overdue"
    },
    {
      id: 2,
      memberName: "Jane Smith",
      membershipId: "LIB002",
      bookTitle: "To Kill a Mockingbird",
      isbn: "978-0-06-112008-4",
      issueDate: "2024-05-18",
      dueDate: "2024-06-18",
      daysOverdue: 5,
      fine: 2.50,
      status: "Overdue"
    },
    {
      id: 3,
      memberName: "Alice Johnson",
      membershipId: "LIB004",
      bookTitle: "The Catcher in the Rye",
      isbn: "978-0-316-76948-0",
      issueDate: "2024-05-20",
      dueDate: "2024-06-20",
      daysOverdue: 0,
      fine: 0,
      status: "Active"
    },
    {
      id: 4,
      memberName: "Mike Wilson",
      membershipId: "LIB003",
      bookTitle: "1984",
      isbn: "978-0-452-28423-4",
      issueDate: "2024-05-15",
      dueDate: "2024-06-15",
      daysOverdue: 8,
      fine: 4.00,
      status: "Overdue"
    }
  ];

  const filteredBooks = issuedBooks.filter(book =>
    book.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.membershipId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReturn = (bookId: number) => {
    console.log("Returning book with ID:", bookId);
    // Handle book return logic here
  };

  const getStatusBadge = (status: string, daysOverdue: number) => {
    if (status === "Overdue") {
      return (
        <Badge className="bg-red-100 text-red-800 flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Overdue ({daysOverdue} days)
        </Badge>
      );
    }
    return <Badge className="bg-green-100 text-green-800">Active</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Book Returns</h1>
        <p className="text-gray-600 mt-1">Manage book returns and track overdue items</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Issued</p>
                <p className="text-3xl font-bold text-gray-900">
                  {issuedBooks.length}
                </p>
              </div>
              <BookMinus className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Books</p>
                <p className="text-3xl font-bold text-red-600">
                  {issuedBooks.filter(book => book.status === "Overdue").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Fines</p>
                <p className="text-3xl font-bold text-orange-600">
                  ${issuedBooks.reduce((sum, book) => sum + book.fine, 0).toFixed(2)}
                </p>
              </div>
              <div className="text-orange-600 text-2xl font-bold">$</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Issued Books</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search issued books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Book Title</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fine</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{book.memberName}</p>
                      <p className="text-sm text-gray-500">{book.membershipId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{book.bookTitle}</p>
                      <p className="text-sm text-gray-500">{book.isbn}</p>
                    </div>
                  </TableCell>
                  <TableCell>{book.issueDate}</TableCell>
                  <TableCell>{book.dueDate}</TableCell>
                  <TableCell>
                    {getStatusBadge(book.status, book.daysOverdue)}
                  </TableCell>
                  <TableCell>
                    {book.fine > 0 ? (
                      <span className="text-red-600 font-medium">${book.fine.toFixed(2)}</span>
                    ) : (
                      <span className="text-green-600">$0.00</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleReturn(book.id)}
                      className="bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Return
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Returns;
