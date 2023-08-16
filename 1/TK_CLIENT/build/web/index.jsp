<%-- 
    Document   : index
    Created on : 21 Jul, 2023, 8:30:13 AM
    Author     : tusha
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>CALCULATOR</title>
    </head>
    <style>
         @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
  /* FOR INPUT BOXES */
input {
  display:block;
  margin: auto;
  block-size:50px;
  font-size: 50px;
  border-block-color: gold;
  background-color: #000000;
  border-radius: 15px;
  font-family: 'Lobster', cursive;
}
textarea:focus,input:focus{
  color: #fff;
}
input,select,textarea{
  color: white;
}


* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: #111;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .waviy {
    position: relative;
    margin-bottom: 0%;
  font-family: 'Lobster', cursive;

  }
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative&family=Monoton&family=Roboto+Slab&family=Roboto:wght@100;900&display=swap');
  .waviy span {
    position: relative;
    display: inline-block;
    font-size: 40px;
    color: #fff;
    text-transform: uppercase;
    animation: flip 2s infinite;
    animation-delay: calc(.2s * var(--i))
    
  }
  .waviy h1 {
    position: relative;
    display: inline-block;
    font-size: 50px;
    color: #fff;    
    
  }
  .waviy p{
    font-size: 70px;
  font-family: 'Lobster', cursive;

  }
  .waviy h2{
    font-family: 'Cinzel Decorative', cursive;
font-family: 'Monoton', cursive;
font-family: 'Roboto', sans-serif;
font-family: 'Roboto Slab', serif;
font-style: unset;
  }
  @keyframes flip {
    0%,80% {
      transform: rotateY(360deg) 
    }
  }
  
  /* css for header  */
.animate-charcter
{
   text-transform: uppercase;
  background-image: linear-gradient(
    -225deg,
    #231557 0%,
    #44107a 29%,
    #ff1361 67%,
    #fff800 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #000000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite;
  display: inline-block;
      font-size: 190px;
}


@keyframes textclip {
  to {
    background-position: 200% center;
  }
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
   body {
    background-color: #111;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .waviy {
    position: relative;
    margin-bottom: 0%;
  font-family: 'Lobster', cursive;

  }
    </style>
    <body>
        <form action="index.jsp">
            <div class="container">
    <div class="row">
      <div class="col-md-12 text-center">
        <h1 class="animate-charcter">CALCULATOR</h1>
      </div>
    </div>
  </div>
            <input type="text" name="t" placeholder="Enter Your Number" >
            <br>
            <input type="text" name="k" placeholder="Enter Your Number">
                  <br>
             <input type="submit" name="type" value="Addition">    
              <br>
              <input type="submit" name="type" value="Subtraction">    
              <br>
              <input type="submit" name="type" value="Multiplication">    
              <br>
              <input type="submit" name="type" value="Division">    
             
        </form>
        
    <%-- start web service invocation --%><hr/>
    <%
    try {
	tk.CALCULATOR_Service service = new tk.CALCULATOR_Service();
	tk.CALCULATOR port = service.getCALCULATORPort();
	 // TODO initialize WS operation arguments here
	 String t=request.getParameter("t");
	 String k=request.getParameter("k");
	 String add=request.getParameter("type");
	 Float tt=Float.parseFloat(t);
	 Float kk=Float.parseFloat(k);
	 if(add.equals("Addition"))
	 {
		 // TODO process result here
		 java.lang.Float result = port.addition(tt, kk);
		 out.println("Result = "+result);
	 }
    } catch (Exception ex) {
	// TODO handle custom exceptions here
    }
    %>
    <%-- end web service invocation --%><hr/>
    <%-- start web service invocation --%><hr/>
    <%
    try {
	tk.CALCULATOR_Service service = new tk.CALCULATOR_Service();
	tk.CALCULATOR port = service.getCALCULATORPort();
	 // TODO initialize WS operation arguments here
	 String t=request.getParameter("t");
	 String k=request.getParameter("k");
	 String add=request.getParameter("type");
	 Float tt=Float.parseFloat(t);
	 Float kk=Float.parseFloat(k);
	 if(add.equals("Division"))
	 {
		 // TODO process result here
		 java.lang.Float result = port.division(tt, kk);
		 out.println("Result = "+result);
	 }
    } catch (Exception ex) {
	// TODO handle custom exceptions here
    }
    %>
    <%-- end web service invocation --%><hr/>
    
    <%-- start web service invocation --%><hr/>
    <%
    try {
	tk.CALCULATOR_Service service = new tk.CALCULATOR_Service();
	tk.CALCULATOR port = service.getCALCULATORPort();
	 // TODO initialize WS operation arguments here
	 String t=request.getParameter("t");
	 String k=request.getParameter("k");
	 String add=request.getParameter("type");
	 Float tt=Float.parseFloat(t);
	 Float kk=Float.parseFloat(k);
	 if(add.equals("Subtraction"))
	 {
		 // TODO process result here
		 java.lang.Float result = port.subtraction(tt, kk);
		 out.println("Result = "+result);
	 }
    } catch (Exception ex) {
	// TODO handle custom exceptions here
    }
    %>
    <%-- end web service invocation --%><hr/>
    <%-- start web service invocation --%><hr/>
    <%
    try {
	tk.CALCULATOR_Service service = new tk.CALCULATOR_Service();
	tk.CALCULATOR port = service.getCALCULATORPort();
	 // TODO initialize WS operation arguments here
	String t=request.getParameter("t");
        String k=request.getParameter("k");
        String mul=request.getParameter("type");
        Float tt=Float.parseFloat(t);
        Float kk=Float.parseFloat(k);
        if(mul.equals("multiplication"))
        {
	java.lang.Float result = port.multiplication(tt, kk);
	out.println("Result = "+result);
        }
    } catch (Exception ex) {
	// TODO handle custom exceptions here
    }
    %>
    <%-- end web service invocation --%><hr/>
    </body>
</html>
