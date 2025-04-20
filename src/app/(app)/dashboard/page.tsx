"use client";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";

// Define interfaces
interface Message {
  id: number;
  nama: string;
  email: string;
  pesan: string;
  dibuatPada: string; // DateTime field as string in API response
}

interface Project {
  id: number;
  judul: string;
  thumbnail?: string; // Optional thumbnail
  deskripsi: string;
  footer: string;
  linkSitus: string;
  linkGithub: string;
  dibuatPada: string; // DateTime field as string in API response
}

const DashboardPage = () => {
  const [isProjectPage, setIsProjectPage] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const [newProject, setNewProject] = useState<Project>({
    id: 0,
    judul: "",
    deskripsi: "",
    footer: "",
    linkSitus: "",
    linkGithub: "",
    dibuatPada: new Date().toISOString(),
  });

  const [newMessage, setNewMessage] = useState<Message>({
    id: 0,
    nama: "",
    email: "",
    pesan: "",
    dibuatPada: new Date().toISOString(),
  });

  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(false);
  const [editingMessage, setEditingMessage] = useState(false);

  // Fetch Projects and Messages from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/proyek");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data.data.proyek);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/pesan");
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data.data.pesan);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
    fetchMessages();
  }, []);

  const handleAddProject = async () => {
    if (editingProject) {
      const response = await fetch(`/api/proyek/${newProject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        console.error("Failed to update project");
        return;
      }
      
      setProjects(projects.map((project) => (project.id === newProject.id ? newProject : project)));
    } else {
      const response = await fetch("/api/proyek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        console.error("Failed to add project");
        return;
      }

      const data = await response.json();
      setProjects([...projects, data.project]);
    }

    setNewProject({
      id: 0,
      judul: "",
      deskripsi: "",
      footer: "",
      linkSitus: "",
      linkGithub: "",
      dibuatPada: new Date().toISOString(),
    });
    setProjectModalOpen(false);
  };

  const handleAddMessage = async () => {
    if (editingMessage) {
      const response = await fetch(`/api/pesan/${newMessage.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        console.error("Failed to update message");
        return;
      }

      setMessages(messages.map((msg) => (msg.id === newMessage.id ? newMessage : msg)));
    } else {
      const response = await fetch("/api/pesan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        console.error("Failed to add message");
        return;
      }

      const data = await response.json();
      setMessages([...messages, data.message]);
    }

    setNewMessage({
      id: 0,
      nama: "",
      email: "",
      pesan: "",
      dibuatPada: new Date().toISOString(),
    });
    setMessageModalOpen(false);
  };

  const handleDeleteProject = async (id: number) => {
    const response = await fetch(`/api/proyek/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete project");
      return;
    }

    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleDeleteMessage = async (id: number) => {
    const response = await fetch(`/api/pesan/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete message");
      return;
    }

    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const handleEditProject = (id: number) => {
    const project = projects.find((proj) => proj.id === id);
    if (project) {
      setNewProject(project);
      setEditingProject(true);
      setProjectModalOpen(true);
    }
  };

  const handleEditMessage = (id: number) => {
    const msg = messages.find((msg) => msg.id === id);
    if (msg) {
      setNewMessage(msg);
      setEditingMessage(true);
      setMessageModalOpen(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-14 px-6">
      <section className="max-w-7xl mx-auto">
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => setIsProjectPage(true)}
            variant={isProjectPage ? "success" : "secondary"}
            className="px-4 py-2 rounded-lg"
          >
            Manage Projects
          </Button>
          <Button
            onClick={() => setIsProjectPage(false)}
            variant={!isProjectPage ? "success" : "secondary"}
            className="px-4 py-2 rounded-lg"
          >
            Manage Messages
          </Button>
        </div>

        {/* Project Section */}
        {isProjectPage ? (
          <div className="bg-white p-4 rounded-xl shadow">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
              🛠️ Manage Projects
            </h1>
            <Button
              onClick={() => {
                setNewProject({
                  id: 0,
                  judul: "",
                  deskripsi: "",
                  footer: "",
                  linkSitus: "",
                  linkGithub: "",
                  dibuatPada: new Date().toISOString(),
                });
                setEditingProject(false);
                setProjectModalOpen(true);
              }}
              variant="success"
              className="mb-4"
            >
              Add New Project
            </Button>
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>List of Projects</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Technologies</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.judul}</TableCell>
                      <TableCell>{project.deskripsi}</TableCell>
                      <TableCell>{project.footer}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          onClick={() => handleEditProject(project.id)}
                          variant="secondary"
                          className="text-blue-600 hover:bg-blue-100 transition-colors duration-200 rounded-lg"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          onClick={() => handleDeleteProject(project.id)}
                          variant="secondary"
                          className="text-red-600 hover:bg-red-100 transition-colors duration-200 rounded-lg"
                        >
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-xl shadow">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
              📩 Manage Messages
            </h1>
            <Button
              onClick={() => {
                setNewMessage({
                  id: 0,
                  nama: "",
                  email: "",
                  pesan: "",
                  dibuatPada: new Date().toISOString(),
                });
                setEditingMessage(false);
                setMessageModalOpen(true);
              }}
              variant="success"
              className="mb-4"
            >
              Add New Message
            </Button>
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>List of Messages</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((msg) => (
                    <TableRow key={msg.id}>
                      <TableCell>{msg.nama}</TableCell>
                      <TableCell>{msg.email}</TableCell>
                      <TableCell>{msg.pesan}</TableCell>
                      <TableCell className="flex gap-4">
                        <Button
                          onClick={() => handleEditMessage(msg.id)}
                          variant="secondary"
                          className="text-blue-600 hover:bg-blue-100 transition-colors duration-200 rounded-lg"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          onClick={() => handleDeleteMessage(msg.id)}
                          variant="secondary"
                          className="text-red-600 hover:bg-red-100 transition-colors duration-200 rounded-lg"
                        >
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </section>

      {/* Modals for Add/Edit Projects and Messages */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        title={editingProject ? "Edit Project" : "Add Project"}
        description={editingProject ? "Edit project details" : "Add new project"}
        formData={newProject}
        setFormData={setNewProject}
        onSubmit={handleAddProject}
      />
      <Modal
        isOpen={isMessageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        title={editingMessage ? "Edit Message" : "Add Message"}
        description={editingMessage ? "Edit your message" : "Add new message"}
        formData={newMessage}
        setFormData={setNewMessage}
        onSubmit={handleAddMessage}
      />
    </main>
  );
};

export default DashboardPage;
