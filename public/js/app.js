
////////// POST QUESTION TO API ///////
var index = new Vue({
    el: '#wrapper',
    data:{
        question:'',
        answer:'',
        questionid:'',
        url:'https://api-helpages.herokuapp.com/questions/',
        qurl:'https://api-helpages.herokuapp.com/questions/'+sessionStorage.getItem('qid'),
        topquestions:[],
        readquestion:[]
    },
    methods:{
        postq: function(){

            axios.post(this.url, {
                text: this.question
              })
              .then((response)=> {
                console.log(response);
               this.topquestions.push(response.data);
               this.topquestions.sort((a ,b)=>{
                 return -1;
               });
               this.question = '';

              })
              .catch((error)=> {
                console.log(error);
              });

           
        },

        posta: function(){

            axios.post(this.qurl+"/answers", {
                text: this.answer
              })
              .then((response)=> {
                console.log(response);
                this.readquestion = response.data;
                this.answer = '';
                 
              })
              .catch((error)=> {
                console.log(error);
              });

        },
        vote: function(index){
            var option = event.path[1].className
            var voteurl =this.qurl+"/answers/"+this.readquestion.answers[index]._id+"/vote-"+option;
           
            axios.post(voteurl, {
              })
              .then((response)=> {
                console.log(response);
                this.readquestion = response.data;

              })
              .catch((error)=> {
                console.log(error);
              });

        },
        saveqid: function (index){
           this.questionid = this.topquestions[index]._id;
           sessionStorage.setItem('qid',this.questionid);
        },
        editor:function(index){
           var url =this.qurl+"/answers/"+this.readquestion.answers[index]._id
           var targetTag = event.target;
           var parentTag = targetTag.parentElement;
           var textarea = document.createElement('textarea');

           //// save
           var savebutton = document.createElement('button');
           savebutton.textContent="Done";
           savebutton.className = "btn btn-primary btn-sm editbutton";
           savebutton.id = 'editdone';

           //// cancel
           var cancelbutton = document.createElement('button');
           cancelbutton.textContent="Cancel";
           cancelbutton.className = "btn btn-primary btn-sm editbutton";
           cancelbutton.setAttribute("id","canceldone");

          //// delete
           var deletebutton = document.createElement('button');
           deletebutton.textContent="Delete";
           deletebutton.className = "btn btn-primary btn-sm editbutton";
           deletebutton.setAttribute("id","deletedone");


           textarea.setAttribute('rows',5);
           textarea.className = "editanswer";
           textarea.textContent = targetTag.textContent;
           parentTag.appendChild(textarea);
           parentTag.appendChild(savebutton);
           parentTag.appendChild(cancelbutton);
           parentTag.appendChild(deletebutton);
           targetTag.nextElementSibling.style.visibility = "hidden";

           parentTag.addEventListener('click',(e)=>{
           var updatedanswer = textarea.value;

               if(e.target.textContent == "Done"){

////////// EDITOR ~   IF USERS CLICKS DONE
                axios.put(url, {
                    text: updatedanswer
                  })
                  .then((response)=> {
                    console.log(response);
                    this.readquestion = response.data;
    
                  })
                  .catch((error)=> {
                    console.log(error);
                  });

                  parentTag.removeChild(textarea);
                  parentTag.removeChild(savebutton);
                  parentTag.removeChild(cancelbutton);
                  parentTag.removeChild(deletebutton);
                  targetTag.nextElementSibling.style.visibility = 'visible';

               }else if(e.target.textContent == "Cancel"){
////////// EDITOR ~   IF USERS CLICKS CANCEL

                parentTag.removeChild(textarea);
                parentTag.removeChild(savebutton);
                parentTag.removeChild(cancelbutton);
                parentTag.removeChild(deletebutton);
                targetTag.nextElementSibling.style.visibility = 'visible';


               }else if(e.target.textContent == "Delete"){
////////// EDITOR ~   IF USERS CLICKS DELETE

                    axios.delete(url, {
                    })
                    .then((response)=> {
                        console.log(response);
                        this.readquestion = response.data;
                    })
                    .catch((error)=> {
                        console.log(error);
                    });

                    parentTag.removeChild(textarea);
                    parentTag.removeChild(savebutton);
                    parentTag.removeChild(cancelbutton);
                    parentTag.removeChild(deletebutton);
                    targetTag.nextElementSibling.style.visibility = 'visible';

               }
           })
           
        }

    },

    mounted(){

        axios.get(this.url).then(response => {
            this.topquestions = response.data;
          });

          axios.get(this.qurl).then(response => {
            this.readquestion = response.data;
          });


    }
    
});
