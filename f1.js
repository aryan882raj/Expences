//AXIOS TOCKEN
axios.defaults.headers.common['X-Auth-Tocken'] = 'sometoken';


// GET REQUEST
function getTodos() {
    console.log('GET Request');
    // axios({
    //     method:'get',
    //     url:'https://jsonplaceholder.typicode.com/todos',// or to limit    https://jsonplaceholder.typicode.com/todos?_limit=5'
    //     params:{
    //         _limit:5,
    //     }
    // })

    //------------------------- or --------------------------------------
    // axios.get('https://jsonplaceholder.typicode.com/todos',{ params:{_limit:5} } )
    //     .then((res)=> showOutput(res)) //console.log(res))
    //     .catch((err)=>console.log(err))
    //   }

   //-------------------------- or --------------------------------------

   axios
   .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
   .then((res)=> showOutput(res)) //console.log(res))
   .catch((err)=>console.error(err))
  }




  // POST REQUEST
  function addTodo() {
    console.log('POST Request');
    // axios({
    //     method:'post',
    //     url:'https://jsonplaceholder.typicode.com/todos',// or to limit    https://jsonplaceholder.typicode.com/todos?_limit=5'
    //     data:{
    //         title:'New Aryan',
    //         completed:false
    //     }
    // })
    // .then((res)=> showOutput(res)) //console.log(res))
    // .catch((err)=>console.error(err))

    // ---------------------------------------  or  ---------------------------
    axios
    .post('https://jsonplaceholder.typicode.com/todos',{ 
        title:'New Aryan',
        completed:false
    })
    .then((res)=> showOutput(res))
    .catch((err)=>console.error(err))
  }
  



  // PUT/PATCH REQUEST
  function updateTodo() {
    console.log('PUT/PATCH Request');
    axios
    // .put('https://jsonplaceholder.typicode.com/todos/1',{    // give id 
    //     title:'Update Put',
    //     completed:false
    // })
    // .then((res)=> showOutput(res))
    // .catch((err)=>console.error(err))

    axios
    .patch('https://jsonplaceholder.typicode.com/todos/1',{
        title:'Update Put',
        completed:false
    })
    .then((res)=> showOutput(res))
    .catch((err)=>console.error(err))
  }
  
  // DELETE REQUEST
  function removeTodo() {
    console.log('DELETE Request');
    axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then((res)=> showOutput(res))
    .catch((err)=>console.error(err))
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    console.log('Simultaneous Request');
    axios
    .all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    // .then((res)=> {
    //     console.log(res[0]);
    //     console.log(res[1]);
    //     showOutput(res[1]);      //show posts wala [1]  
    // })
    .then(axios.spread( (todos,posts) => {showOutput(posts)} ) )
    .catch((err)=>console.error(err))
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    console.log('Custom Headers');
    const config = {
        headers : {
            'Context-Type':'application/json',
            Authorization : 'sometocken',
            Eg: 'All---------------'
        }
    };
    axios
    .post('https://jsonplaceholder.typicode.com/todos',{ 
        title:'New Aryan',
        completed:false
    } , config)
    .then((res)=> showOutput(res))
    .catch((err)=>console.error(err))
  }


  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    console.log('Transform Response');
    const option={
        method:'post',
        url:'https://jsonplaceholder.typicode.com/todos',
        data:{ title : "hello World"},
        transformResponse: axios.defaults.transformResponse.concat(data=>{
            data.title = data.title.toUpperCase();
            return data;
        })
    };
    axios(option).then(res => showOutput(res));
  }
  
  // ERROR HANDLING
  function errorHandling() {
    console.log('Error Handling');
    axios
   .get('https://jsonplaceholder.typicode.com/todoss')
   .then((res)=> showOutput(res)) //console.log(res))
   .catch((err)=>{
    if(err.response){
        //url error
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if(err.response.status === 404){
            alert('Error :Page Not Found');
        }
        else if(err.request){
            //request made btu no response
            console.log(err.request);
        }
        else{
            console.log(err.message);
        }
    }
   })
  }
  
  
  // CANCEL TOKEN
  function cancelToken() {
    console.log('Cancel Token');
    const source = axios.CancelToken.source();

    axios
    .get('https://jsonplaceholder.typicode.com/todos',{
    cancelTocken:source.token
   })
   .then(res=> showOutput(res))
   .catch(thrown => {
    if (axios.isCancel(thrown)){
        console.log('Request Cancel',thrown.message);
    }
   });

   if(true){
    source.cancel('Request Canceled!');
   }
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(
    config => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url}
     at ${new Date().getTime()} ha ha ha`);
    return config
  },error =>{
    return new Promise.reject(error);
  }
  );
  
  // AXIOS INSTANCES
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);