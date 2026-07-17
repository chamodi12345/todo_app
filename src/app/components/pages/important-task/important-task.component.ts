import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-important-task',
  imports: [PageTitleComponent,TaskListComponent],
  templateUrl: './important-task.component.html',
  styleUrl: './important-task.component.scss'
})
export class ImportantTaskComponent {

  newTask='';
    taskList:any[]=[];
    
    ngOnInit(){
      this.getAllTasks();
  
    }
  
    httpService = inject(HttpService);
  
   
  
    getAllTasks(){
      this.httpService.getAllTasks().subscribe((result:any)=>{
        this.taskList=result.filter((x:any)=>x.important==true);
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
