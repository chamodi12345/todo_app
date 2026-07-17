import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';

import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-task',
  imports: [FormsModule,PageTitleComponent,TaskListComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss'
})
export class AllTaskComponent {
  newTask='';
  initialTaskList:any[]=[];
  taskList:any[]=[];
  httpService = inject(HttpService);


  stateService = inject(StateService);
  
  
  ngOnInit(){
    this.getAllTasks();
    this.stateService.searchSubject.subscribe((value)=>{

      console.log("search", value);

      if(value){
        this.taskList=this.taskList.filter(x=>x.title.toLowerCase().includes(value.toLowerCase()))
      }else{
        this.taskList= this.initialTaskList;
      }
    })


  }



  addTask(){
    console.log("addTask", this.newTask);

    this.httpService.addTask(this.newTask).subscribe(()=>{
      this.newTask="";
      
      this.getAllTasks();
      
    })
  }

  getAllTasks(){
    this.httpService.getAllTasks().subscribe((result:any)=>{
      this.initialTaskList=this.taskList = result;
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

  


