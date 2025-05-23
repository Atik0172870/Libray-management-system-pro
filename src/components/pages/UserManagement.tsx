import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, UserPlus, Pencil, Trash2 } from "lucide-react";

// Define user type that would normally come from AuthContext
interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'librarian' | 'user';
  status: 'active' | 'inactive';
  avatar?: string;
  dateAdded: string;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserData[]>([
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@library.com',
      role: 'admin',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952',
      dateAdded: '2023-01-15',
    },
    {
      id: '2',
      name: 'John Librarian',
      email: 'librarian@library.com',
      role: 'librarian',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      dateAdded: '2023-02-20',
    },
    {
      id: '3',
      name: 'Sarah Member',
      email: 'sarah@example.com',
      role: 'user',
      status: 'active',
      avatar: '',
      dateAdded: '2023-03-10',
    },
    {
      id: '4',
      name: 'Mike Reader',
      email: 'mike@example.com',
      role: 'user',
      status: 'inactive',
      avatar: '',
      dateAdded: '2023-04-05',
    },
  ]);
  
  const [newUser, setNewUser] = useState<Partial<UserData>>({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
  });
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const userToAdd: UserData = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as 'admin' | 'librarian' | 'user',
      status: newUser.status as 'active' | 'inactive',
      dateAdded: new Date().toISOString().split('T')[0],
    };
    
    if (isEditMode) {
      setUsers(users.map(user => user.id === newUser.id ? {...user, ...newUser} : user));
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    } else {
      setUsers([...users, userToAdd]);
      toast({
        title: "Success",
        description: "User added successfully",
      });
    }
    
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      status: 'active',
    });
    setIsEditMode(false);
    setDialogOpen(false);
  };
  
  const handleEditUser = (user: UserData) => {
    setNewUser(user);
    setIsEditMode(true);
    setDialogOpen(true);
  };
  
  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "Success",
      description: "User deleted successfully",
    });
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage system users and permissions</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit User" : "Add New User"}</DialogTitle>
              <DialogDescription>
                {isEditMode ? "Update user details below." : "Fill in the information to create a new user."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newUser.name || ''}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email || ''}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({...newUser, role: value as 'admin' | 'librarian' | 'user'})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="librarian">Librarian</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newUser.status}
                  onValueChange={(value) => setNewUser({...newUser, status: value as 'active' | 'inactive'})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setDialogOpen(false);
                setIsEditMode(false);
                setNewUser({
                  name: '',
                  email: '',
                  role: 'user',
                  status: 'active',
                });
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>
                {isEditMode ? "Update User" : "Add User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : user.role === 'librarian'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </div>
                </TableCell>
                <TableCell>{user.dateAdded}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
