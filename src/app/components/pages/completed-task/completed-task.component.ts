import { Component, inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';

@Component({
  selector: 'app-completed-task',
  imports: [PageTitleComponent,TaskListComponent],
  templateUrl: './completed-task.component.html',
  styleUrl: './completed-task.component.scss'
})
export class CompletedTaskComponent {

   newTask='';
      taskList:any[]=[];
      
      ngOnInit(){
        this.getAllTasks();
    
      }
    
      httpService = inject(HttpService);
    
     
    
      getAllTasks(){
        this.httpService.getAllTasks().subscribe((result:any)=>{
          this.taskList=result.filter((x:any)=>x.complete==true);
        })
      }
  
  
      OnComplete(task: any){
        task.complete=true;
        console.log("complete", task)
        this.httpService.updateTask(task).subscribe(()=>{
    
        })
        this.getAllTasks();
    
       
    
      }
    
    
      OnImportant(task: any){
        task.important=true;
        this.httpService.updateTask(task).subscribe(()=>{
          
        })
        this.getAllTasks();
    
       
    
      }

  
}
