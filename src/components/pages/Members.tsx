
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Plus, Search, Edit, Trash2, Eye, Mail, Phone } from "lucide-react";
import MemberModal from "@/components/modals/MemberModal";
import { useNotifications } from "@/contexts/NotificationsContext";

const Members = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { addNotification } = useNotifications();

  const members = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1-234-567-8900",
      membershipId: "LIB001",
      joinDate: "2024-01-15",
      status: "Active",
      booksIssued: 3,
      overdue: 0
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1-234-567-8901",
      membershipId: "LIB002",
      joinDate: "2024-02-10",
      status: "Active",
      booksIssued: 1,
      overdue: 0
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@email.com",
      phone: "+1-234-567-8902",
      membershipId: "LIB003",
      joinDate: "2024-01-20",
      status: "Suspended",
      booksIssued: 2,
      overdue: 1
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      phone: "+1-234-567-8903",
      membershipId: "LIB004",
      joinDate: "2024-03-05",
      status: "Active",
      booksIssued: 0,
      overdue: 0
    }
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.membershipId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: any) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleViewMember = (id: number) => {
    navigate(`/members/${id}`);
  };

  const handleDeleteMember = (member: any) => {
    // In a real app, make an API call to delete
    addNotification({
      title: "Member Deleted",
      message: `${member.name} has been removed from the system.`,
      type: "info"
    });
  };

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Suspended</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Members Management</h1>
          <p className="text-gray-600 mt-1 dark:text-gray-400">Manage library members and their accounts</p>
        </div>
        <Button onClick={handleAddMember} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Member Directory</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search members..."
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
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Member ID</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Books Issued</TableHead>
                <TableHead>Overdue</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1" />
                        {member.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1" />
                        {member.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.membershipId}</TableCell>
                  <TableCell>{member.joinDate}</TableCell>
                  <TableCell>{getStatusBadge(member.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.booksIssued}</Badge>
                  </TableCell>
                  <TableCell>
                    {member.overdue > 0 ? (
                      <Badge className="bg-red-100 text-red-800">{member.overdue}</Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-800">0</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewMember(member.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditMember(member)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteMember(member)}
                      >
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

      <MemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={editingMember}
      />
    </div>
  );
};

export default Members;
