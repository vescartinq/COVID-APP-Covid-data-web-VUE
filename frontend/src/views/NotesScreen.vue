<template>
  <div class="container">
    <h1>Notes</h1>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="message.colour"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ message.text }}
    </b-alert>

    <form @submit.prevent="editNote(noteEdit)" v-if="edit">
      <h3>Edit note</h3>
      <input
        type="text"
        class="form-control my-2"
        placeholder="Name"
        v-model="noteEdit.name"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Description"
        v-model="noteEdit.description"
      />
      <b-button class="btn-warning my-2 mx-2" type="submit">Edit</b-button>
      <b-button class="my-2" type="submit" @click="edit = false"
        >Cancel</b-button
      >
    </form>

    <form @submit.prevent="addNote()" v-if="!edit">
      <h3>Add new note</h3>
      <input
        type="text"
        class="form-control my-2"
        placeholder="Name"
        v-model="note.name"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Description"
        v-model="note.description"
      />
      <b-button class="btn-success my-2 btn-block" type="submit"
        >Add New Note</b-button
      >
    </form>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in notes" :key="index">
          <th scope="row">{{ item._id }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>
            <!-- <b-button @click="alerta()">Acción</b-button> -->
            <b-button
              @click="deleteNote(item._id)"
              class="btn-danger btn-sm mx-2"
              >Delete
            </b-button>
            <b-button
              @click="activateEdition(item._id)"
              class="btn-warning btn-sm"
              >Edit
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  // Initial state
  data() {
    return {
      notes: [],
      dismissSecs: 2,
      dismissCountDown: 0,
      message: { colour: '', text: '' },
      note: { name: '', description: '' },
      edit: false,
      noteEdit: {},
    };
  },
  // Read items that give permisons to execute actions
  computed: {
    ...mapState(['token']),
  },
  // After Component DidMount
  created() {
    this.listNotes();
  },
  // Actions
  methods: {
    alert() {
      this.message.colour = 'danger';
      this.message.text = 'Alert prove';
      this.showAlert();
    },
    listNotes() {
      let config = {
        headers: {
          token: this.token,
        },
      };

      this.axios
        .get('/note', config)
        .then((res) => {
          // console.log(res);
          this.notes = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    addNote() {
      let config = {
        headers: {
          token: this.token,
        },
      };

      this.axios
        .post('/new-note', this.note, config)
        .then((res) => {
          this.notes.push(res.data);
          this.note.name = '';
          this.note.description = '';
          this.message.colour = 'success';
          this.message.text = 'Note Added!';
          this.showAlert();
        })
        .catch((e) => {
          console.log(e.response);
          if (e.response.data.error.errors.name.message) {
            this.message.text = e.response.data.error.errors.name.message;
          } else {
            this.message.text = 'System Error';
          }
          this.message.colour = 'danger';
          this.showAlert();
        });
    },
    deleteNote(id) {
      this.axios
        .delete(`/note/${id}`)
        .then((res) => {
          this.notes = this.notes.filter((item) => item._id !== id);
          this.message.colour = 'success';
          this.message.text = `${res.data} succesfully!`;
          this.showAlert();
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    activateEdition(id) {
      this.edit = true;
      console.log(id);
      this.axios
        .get(`/note/${id}`)
        .then((res) => {
          this.noteEdit = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    editNote(item) {
      this.axios
        .put(`/note/${item._id}`, item)
        .then((res) => {
          const editingNote = this.notes.find(
            (note) => note._id === res.data._id
          );
          editingNote.name = res.data.name;
          editingNote.description = res.data.description;
          this.message.colour = 'success';
          this.message.text = 'Note Edited successfully!';
          this.showAlert();
          this.edit = false;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>
