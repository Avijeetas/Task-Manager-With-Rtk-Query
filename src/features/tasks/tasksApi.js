import { apiSlice } from "../api/apiSlice";
export const tasksApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getTasks: builder.query({
            query: () =>
                `/tasks`,
        }),

        getTask: builder.query({
            query: (id) =>`/tasks/${id}`,
        }),
        addTask: builder.mutation({
            query(taskData){
                return {
                    url: '/tasks',
                    method: "POST",
                    body: taskData
                };
            },

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const {data: newTask} = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData("getTasks",
                        undefined,
                        (draft)=>{
                            draft.push(newTask);
                        }
                        )
                    )
                } catch(err){
                    console.log(err);
                }
            }
            
        }),
        editTask: builder.mutation({
            query({ id, data }) {
              return {
                url: `/tasks/${id}`,
                method: "PATCH",
                body: data
              };
            },
          
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
              try {
                const { data: updatedTask } = await queryFulfilled;
                console.log(updatedTask);
          
                // Update cache for getTask
                dispatch(
                  apiSlice.util.updateQueryData("getTask",
                    id.toString(),
                    (draft) => Object.assign(draft, updatedTask)
                  )
                );
          
                // Update cache for getTasks
                dispatch(
                  apiSlice.util.updateQueryData("getTasks",
                    undefined,
                    (draft) => {
                      const taskIndex = draft.findIndex(task => task.id == id);
                      if (taskIndex !== -1) {
                        draft[taskIndex] = updatedTask;
                      }
                    }
                  )
                );
              } catch (err) {
                console.log(err);
              }
            }
          }),
          editTaskStatus: builder.mutation({
            query: ({ id, status }) => ({
              url: `/tasks/${id}`,
              method: 'PATCH',
              body:  {status}
            }),
            async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
                try {
                  const { data: updatedTask } = await queryFulfilled;
                  console.log(updatedTask);
            
                  // Update cache for getTask
                  dispatch(
                    apiSlice.util.updateQueryData("getTask",
                      id.toString(),
                      (draft) => Object.assign(draft, updatedTask)
                    )
                  );
            
                  // Update cache for getTasks
                  dispatch(
                    apiSlice.util.updateQueryData("getTasks",
                      undefined,
                      (draft) => {
                        const taskIndex = draft.findIndex(task => task.id == id);
                        if (taskIndex !== -1) {
                          draft[taskIndex] = updatedTask;
                        }
                      }
                    )
                  );
                } catch (err) {
                  console.log(err);
                }
              }
          }),
          deleteTask: builder.mutation({
            query: (id) => ({
              url: `/tasks/${id}`,
              method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
              const result = dispatch(
                apiSlice.util.updateQueryData('getTasks',
                undefined,
                (draft)=>{
                  const idx = draft.findIndex((task)=>task.id==arg);
                  draft.splice(idx,1);
                })
                );

                try{
                  const response =await queryFulfilled;
                }catch(err){
                  result.undo();
                }
                  
              }
          })
          
          
          
    })
});

export const {useGetTasksQuery, 
    useAddTaskMutation, 
    useGetTaskQuery, 
    useEditTaskMutation,
    useEditTaskStatusMutation,
    useDeleteTaskMutation
} = tasksApi;