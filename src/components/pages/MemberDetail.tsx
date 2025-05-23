
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  AlertTriangle,
  Edit,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch from API
    // For demo, we're using mock data
    const mockMembers = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1-234-567-8900",
        membershipId: "LIB001",
        joinDate: "2024-01-15",
        status: "Active",
        address: "123 Main St, Anytown, CA 90210",
        booksIssued: [
          { id: 1, title: "To Kill a Mockingbird", issueDate: "2024-05-01", dueDate: "2024-05-15", status: "On time" },
          { id: 2, title: "1984", issueDate: "2024-04-20", dueDate: "2024-05-04", status: "Overdue" },
          { id: 3, title: "The Great Gatsby", issueDate: "2024-05-10", dueDate: "2024-05-24", status: "On time" }
        ]
      },
      // Add more mock members
    ];
    
    setTimeout(() => {
      const foundMember = mockMembers.find(m => m.id.toString() === id);
      setMember(foundMember);
      setLoading(false);
    }, 500); // Simulate API delay
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-semibold">Member not found</h3>
        <Button variant="link" onClick={() => navigate('/members')}>
          Return to Members List
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Suspended</Badge>
    );
  };

  const getBookStatusBadge = (status: string) => {
    return status === "On time" ? (
      <Badge className="bg-green-100 text-green-800">On time</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Overdue</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/members')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Members
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/members/edit/${id}`)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Member
          </Button>
          <Button variant="destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Member
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Member Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-600 mb-4">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <div className="mt-1">{getStatusBadge(member.status)}</div>
                <p className="text-gray-500 mt-1">Member ID: {member.membershipId}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{member.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{member.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p>{member.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p>{new Date(member.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 md:col-span-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Borrowed Books</CardTitle>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-gray-500" />
                  <span className="font-semibold">{member.booksIssued.length} Books</span>
                  
                  {member.booksIssued.some((book: any) => book.status === "Overdue") && (
                    <Badge className="bg-red-100 text-red-800 ml-2">
                      <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                      Overdue
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {member.booksIssued.map((book: any) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{new Date(book.issueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(book.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getBookStatusBadge(book.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
