<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <div class="container">
    <RouterView />
    <footer class="mx-auto text-center">
      &copy; {{ year }} - Razvoj Veb Aplikacija
    </footer>
  </div>
</template>

<style>
[data-bs-theme="dark"] {
  --bs-body-bg: #5C4F4A;
  
  --bs-body-color: #EDE9E6;
  
  --bs-primary: #C9996B;
  --bs-primary-rgb: 201, 153, 107;
  
  --bs-secondary-bg: #5C766D; 
  --bs-tertiary-bg: #5C766D;
  
  --bs-secondary-color: #EDE9E6;
  --bs-border-color: rgba(237, 233, 230, 0.25);
  
  --bs-link-color: #C9996B;
  --bs-link-hover-color: #EDE9E6;
}

.navbar {
  border-radius: 0 !important; 
  background-color: #3b3330 !important; 
  border-bottom: 1px solid rgba(201, 153, 107, 0.3); 
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.navbar .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-nav {
  align-items: center;
  gap: 0.5rem;
}

.card, 
.form-control, 
.form-select, 
.btn, 
.table, 
.breadcrumb {
  border-radius: 12px !important;
}

.card {
  border: 1px solid rgba(201, 153, 107, 0.2) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  background-color: #5C766D !important;
}

.custom-form, .book {
  background-color: #5C766D;
  padding: 30px;
  border-radius: 16px !important;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(201, 153, 107, 0.25);
}

.btn-primary {
  background-color: #C9996B;
  border-color: #C9996B;
  color: #3b3330; 
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #b5855a; 
  border-color: #b5855a;
  color: #3b3330;
  transform: translateY(-1px);
}

.table {
  overflow: hidden;
  border-collapse: separate;
  border-spacing: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  --bs-table-bg: #5C766D;
  --bs-table-striped-bg: #526860;
  --bs-table-color: #EDE9E6;
  --bs-table-hover-bg: rgba(201, 153, 107, 0.25);
  border-color: rgba(201, 153, 107, 0.2);
}

.table th, .table td {
  padding: 14px 16px !important;
  vertical-align: middle;
}

.form-control, .form-select {
  background-color: #526860;
  border: 1px solid rgba(201, 153, 107, 0.4);
  color: #EDE9E6;
  padding: 12px 16px;
  font-size: 0.95rem;
}

.form-control:focus, .form-select:focus {
  background-color: #526860;
  border-color: #C9996B;
  box-shadow: 0 0 0 0.25rem rgba(201, 153, 107, 0.25);
  color: #EDE9E6;
}

.form-control::placeholder {
  color: rgba(237, 233, 230, 0.6);
}

.breadcrumb {
  background-color: #5C766D;
  padding: 12px 18px;
  border: 1px solid rgba(201, 153, 107, 0.2);
}
</style>