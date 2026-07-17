import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'] // Fixed property
})
export class TaskListComponent {
  @Input() taskList: { id: any; title: string; important: boolean; complete:boolean }[] = [];

  @Output() important = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  markImportant(task: any): void {
    this.important.emit(task);
  }

  markComplete(task: any): void {
    this.complete.emit(task);
  }

  trackByTaskId(index: number, task: any): any {
    return task.id || index; // Unique identifier or fallback to index
  }
}
