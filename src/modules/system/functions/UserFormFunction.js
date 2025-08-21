export const handleCreate = (self) => {
  const { password, verifyPassword } = self.state.data;
  if (password !== verifyPassword) {
    alert("Failed to verify password.");
    return;
  }

  self.onCreate();
};
