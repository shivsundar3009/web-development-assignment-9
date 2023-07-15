In React, there are several ways to pass data from one component to another. The method you choose depends on the relationship between the components and the complexity of the data you need to pass. Here are some common approaches:

01. Props: The most common way to pass data is through props. You can pass data from a parent component to a child component by simply including the data as attributes when rendering the child component. The child component can then access the data through its props.

   Parent component:
   ```
   const ParentComponent = () => {
     const data = "Hello, child component!";
   
     return <ChildComponent message={data} />;
   };
   ```

   Child component:
   ```
   const ChildComponent = (props) => {
     return <div>{props.message}</div>;
   };
   ```

02. Context: React's Context API allows you to share data across multiple components without passing it through each level manually. Context provides a way to create a global state that can be accessed by any component within its provider hierarchy.

   Provider component:
   ```
   const DataContext = React.createContext();

   const DataProvider = ({ children }) => {
     const data = "Shared data";

     return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
   };
   ```

   Consumer component:
   ```
   const ChildComponent = () => {
     const data = useContext(DataContext);
   
     return <div>{data}</div>;
   };
   ```

   Wrap the consuming components with the `DataProvider` to make the data available:

   ```
   const App = () => {
     return (
       <DataProvider>
         <ChildComponent />
       </DataProvider>
     );
   };
   ```

03. State management libraries: For complex applications with a large amount of shared state or when components are not directly related, you can use state management libraries like Redux or MobX. These libraries provide centralized state management, allowing you to access and update data from any component within your application.

04. URL parameters: If you need to pass data between components based on the URL, you can use URL parameters. Libraries like React Router allow you to define dynamic segments in your routes, which can be accessed by the components rendered for those routes.

   Example:
   ```
   import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';

   const UserComponent = () => {
     const { userId } = useParams();
   
     return <div>User ID: {userId}</div>;
   };

   const App = () => {
     return (
       <Router>
         <div>
           <Link to="/users/1">User 1</Link>
           <Link to="/users/2">User 2</Link>
           <Switch>
             <Route path="/users/:userId">
               <UserComponent />
             </Route>
           </Switch>
         </div>
       </Router>
     );
   };
   ```

These are just a few examples of how you can pass data between components in React. The approach you choose depends on the specific requirements of your application and the relationships between your components.