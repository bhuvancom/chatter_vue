<template>
  <div></div>
</template>
<script>
export default {
  name: "Profile",
  props:["uid"],
  data() {
    return {
      name:null,
      email:null,
      userid:null,
    };
  },
  methods: {
      
  },
  created(){
    console.log(uid);
    
  }
};
</script>