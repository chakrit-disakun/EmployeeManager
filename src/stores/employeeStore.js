import { defineStore } from 'pinia';

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: []
  }),
  actions: {
    addEmployee(uid, name, gender, role) {
      if (name.trim()) {
        this.employees.push({ uid: uid, name: name.trim(), gender: gender, role: role });
      }
    },
    updateEmployee(uid, newName, gender, role) {
      // Find the index of the employee with the given UID
      const index = this.employees.findIndex(emp => emp.uid === uid);

      if (index !== -1 && newName.trim()) {
        // Update the employee details
        this.employees[index] = { uid, name: newName.trim(), gender, role };
      }
    },
    deleteEmployee(uid) {
      // Find the index of the employee with the given UID
      const index = this.employees.findIndex(emp => emp.uid === uid);

      if (index !== -1) {
        // Remove the employee from the array
        this.employees.splice(index, 1);
      }
    }
  },
  persist: true // Enable persisted state
});
