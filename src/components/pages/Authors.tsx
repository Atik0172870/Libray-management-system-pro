
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
import { Plus, Search, Edit, Trash2, User, Mail, Globe } from "lucide-react";
import AuthorModal from "@/components/modals/AuthorModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Authors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const authors = [
    {
      id: 1,
      name: "F. Scott Fitzgerald",
      email: "contact@fitzgeraldworks.com",
      nationality: "American",
      birthYear: 1896,
      biography: "American novelist and short story writer",
      bookCount: 8,
      popularBooks: ["The Great Gatsby", "Tender Is the Night"],
      avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
    },
    {
      id: 2,
      name: "Harper Lee",
      email: "harper@leeauthor.com",
      nationality: "American",
      birthYear: 1926,
      biography: "American novelist known for To Kill a Mockingbird",
      bookCount: 3,
      popularBooks: ["To Kill a Mockingbird", "Go Set a Watchman"],
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      id: 3,
      name: "George Orwell",
      email: "george@orwellbooks.com",
      nationality: "British",
      birthYear: 1903,
      biography: "English novelist and essayist",
      bookCount: 12,
      popularBooks: ["1984", "Animal Farm", "Homage to Catalonia"],
      avatar: ""
    },
    {
      id: 4,
      name: "J.D. Salinger",
      email: "jd@salingerworks.com",
      nationality: "American",
      birthYear: 1919,
      biography: "American writer known for The Catcher in the Rye",
      bookCount: 5,
      popularBooks: ["The Catcher in the Rye", "Nine Stories"],
      avatar: ""
    }
  ];

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.nationality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAuthor = () => {
    setEditingAuthor(null);
    setIsModalOpen(true);
  };

  const handleEditAuthor = (author: any) => {
    setEditingAuthor(author);
    setIsModalOpen(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Authors Management</h1>
          <p className="text-gray-600 mt-1">Manage book authors and their information</p>
        </div>
        <Button onClick={handleAddAuthor} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New Author
        </Button>
      </div>

      {/* Author Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Authors</p>
                <p className="text-3xl font-bold text-gray-900">{authors.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Books</p>
                <p className="text-3xl font-bold text-gray-900">
                  {authors.reduce((sum, author) => sum + author.bookCount, 0)}
                </p>
              </div>
              <div className="text-blue-600 text-2xl font-bold">#</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Books/Author</p>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round(authors.reduce((sum, author) => sum + author.bookCount, 0) / authors.length)}
                </p>
              </div>
              <div className="text-blue-600 text-2xl font-bold">~</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Authors Directory</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search authors..."
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
                <TableHead>Author Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Nationality</TableHead>
                <TableHead>Birth Year</TableHead>
                <TableHead>Book Count</TableHead>
                <TableHead>Popular Books</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAuthors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={author.avatar} />
                        <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
                      </Avatar>
                      <span>{author.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Mail className="h-3 w-3 mr-1" />
                      {author.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Globe className="h-3 w-3 mr-1" />
                      {author.nationality}
                    </div>
                  </TableCell>
                  <TableCell>{author.birthYear}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {author.bookCount} books
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-48">
                      {author.popularBooks.slice(0, 2).map((book, index) => (
                        <Badge key={index} variant="secondary" className="mr-1 mb-1 text-xs">
                          {book}
                        </Badge>
                      ))}
                      {author.popularBooks.length > 2 && (
                        <span className="text-xs text-gray-500">+{author.popularBooks.length - 2} more</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditAuthor(author)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AuthorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        author={editingAuthor}
      />
    </div>
  );
};

export default Authors;
