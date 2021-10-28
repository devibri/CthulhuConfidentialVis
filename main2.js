var tableData = [
    {
    id:1,
    user:{
        name:"steve",
        age:23
    },
    col:"red",
    cheese:true
},
]

var table = new Tabulator("#example-table", {
  data:tableData, 
    columns:[
        {title:"Name", field:"user.name",headerVertical:true},  //link column to name property of user object
    ],
});

// var table = new Tabulator("#example-table", {
//     data:tableData, //set initial table data
//     columns:[
//         {title:"Name", field:"name",headerVertical:true},
//         {title:"Age", field:"age",headerVertical:true},
//         {title:"Gender", field:"gender",headerVertical:true},
//         {title:"Height", field:"height",headerVertical:true},
//         {title:"Favourite Color", field:"col",headerVertical:true},
//         {title:"Date Of Birth", field:"dob",headerVertical:true},
//         {title:"Cheese Preference", field:"cheese",headerVertical:true},
//     ],
// });