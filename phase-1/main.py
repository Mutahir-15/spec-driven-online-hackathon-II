"""
CLI Todo App - Phase 1 MVP
A simple in-memory task manager.
"""
import sys

# Global Data Storage
tasks = []
next_task_id = 1

def get_valid_input(prompt, validator=None):
    """
    Helper to get valid input from user.
    validator: function that takes string and returns (bool, value)
    """
    while True:
        user_input = input(prompt).strip()
        if not validator:
            return user_input
            
        is_valid, value = validator(user_input)
        if is_valid:
            return value
        print(f"Invalid input. {value}") # value acts as error message here

def get_valid_priority(prompt):
    """Gets a valid priority (High, Medium, Low) or defaults to Medium."""
    while True:
        user_input = input(prompt).strip()
        if not user_input:
            return "Medium"
        
        normalized = user_input.capitalize()
        if normalized in ["High", "Medium", "Low"]:
            return normalized
        print("Invalid priority. Allowed: High, Medium, Low.")

def parse_tags(tags_input):
    """Parses comma-separated tags into a list of lowercase strings."""
    if not tags_input:
        return []
    return [tag.strip().lower() for tag in tags_input.split(",") if tag.strip()]

def find_task_by_id(task_id):
    """Finds a task dict by its ID. Returns None if not found."""
    for task in tasks:
        if task['id'] == task_id:
            return task
    return None

def add_task():
    global next_task_id
    print("\n--- Add New Task ---")
    title = get_valid_input("Title: ", lambda x: (bool(x), x if x else "Title cannot be empty."))
    description = input("Description (optional): ").strip()
    priority = get_valid_priority("Priority (High/Medium/Low) [Medium]: ")
    tags_input = input("Tags (comma-separated): ").strip()
    tags = parse_tags(tags_input)
    
    new_task = {
        'id': next_task_id,
        'title': title,
        'description': description,
        'completed': False,
        'priority': priority,
        'tags': tags
    }
    tasks.append(new_task)
    print(f"Task '{title}' added with ID {next_task_id}.")
    next_task_id += 1

def view_tasks():
    print("\n--- Task List ---")
    if not tasks:
        print("No tasks found.")
        return

    print(f"{'ID':<5} {'Status':<12} {'Priority':<10} {'Tags':<20} {'Title'}")
    print("-" * 80)
    for task in tasks:
        status = "[x] Completed" if task['completed'] else "[ ] Pending"
        priority = task.get('priority', 'Medium')
        tags = ", ".join(task.get('tags', []))
        print(f"{task['id']:<5} {status:<12} {priority:<10} {tags:<20} {task['title']}")

def update_task():
    print("\n--- Update Task ---")
    if not tasks:
        print("No tasks to update.")
        return
        
    task_id_input = get_valid_input("Enter Task ID: ", lambda x: (x.isdigit(), x if x.isdigit() else "ID must be a number."))
    task_id = int(task_id_input)
    
    task = find_task_by_id(task_id)
    if not task:
        print(f"Task with ID {task_id} not found.")
        return
        
    print(f"Updating '{task['title']}' (Leave blank to keep current)")
    new_title = input(f"New Title [{task['title']}]: ").strip()
    new_desc = input(f"New Description [{task['description']}]: ").strip()
    new_priority_input = input(f"New Priority [{task.get('priority', 'Medium')}]: ").strip()
    new_tags_input = input(f"New Tags (comma-separated) [{', '.join(task.get('tags', []))}]: ").strip()

    if new_title:
        task['title'] = new_title
    if new_desc:
        task['description'] = new_desc
    if new_priority_input:
        # Re-use logic or manual check? Manual check for update flow to allow blank skip
        normalized = new_priority_input.capitalize()
        if normalized in ["High", "Medium", "Low"]:
            task['priority'] = normalized
        else:
            print("Invalid priority. keeping current.")
    if new_tags_input:
        task['tags'] = parse_tags(new_tags_input)
        
    print("Task updated successfully.")

def delete_task():
    print("\n--- Delete Task ---")
    if not tasks:
        print("No tasks to delete.")
        return

    task_id_input = get_valid_input("Enter Task ID: ", lambda x: (x.isdigit(), x if x.isdigit() else "ID must be a number."))
    task_id = int(task_id_input)
    
    task = find_task_by_id(task_id)
    if not task:
        print(f"Task with ID {task_id} not found.")
        return
        
    tasks.remove(task)
    print(f"Task {task_id} deleted.")

def toggle_task_completion():
    print("\n--- Toggle Completion ---")
    if not tasks:
        print("No tasks found.")
        return

    task_id_input = get_valid_input("Enter Task ID: ", lambda x: (x.isdigit(), x if x.isdigit() else "ID must be a number."))
    task_id = int(task_id_input)
    
    task = find_task_by_id(task_id)
    if not task:
        print(f"Task with ID {task_id} not found.")
        return
        
    task['completed'] = not task['completed']
    status = "Completed" if task['completed'] else "Pending"
    print(f"Task {task_id} marked as {status}.")

def search_tasks():
    print("\n--- Search Tasks ---")
    keyword = input("Enter keyword: ").strip().lower()
    if not keyword:
        print("Empty keyword. Returning.")
        return
        
    matching = [t for t in tasks if keyword in t['title'].lower() or keyword in t['description'].lower()]
    
    if not matching:
        print("No matching tasks found.")
        return
        
    print(f"\nFound {len(matching)} matches:")
    for task in matching:
        print(f"- [{task['id']}] {task['title']} ({task.get('priority', 'Medium')})")

def filter_tasks():
    print("\n--- Filter Tasks ---")
    print("1. By Status")
    print("2. By Priority")
    print("3. By Tag")
    choice = input("Choose filter: ").strip()
    
    filtered = []
    if choice == '1':
        status_input = input("Enter status (Completed/Pending): ").strip().lower()
        is_completed = True if status_input == "completed" else False
        filtered = [t for t in tasks if t['completed'] == is_completed]
    elif choice == '2':
        priority = get_valid_priority("Enter Priority: ")
        filtered = [t for t in tasks if t.get('priority', 'Medium') == priority]
    elif choice == '3':
        tag_input = input("Enter tag: ").strip().lower()
        filtered = [t for t in tasks if tag_input in t.get('tags', [])]
    else:
        print("Invalid choice.")
        return

    if not filtered:
        print("No tasks match filter.")
        return

    print(f"\nFiltered Results ({len(filtered)}):")
    for task in filtered:
        print(f"- [{task['id']}] {task['title']}")

def sort_tasks():
    print("\n--- Sort Tasks ---")
    print("1. Alphabetical (A-Z)")
    print("2. Priority (High-Medium-Low)")
    choice = input("Choose sort: ").strip()
    
    sorted_list = []
    if choice == '1':
        sorted_list = sorted(tasks, key=lambda x: x['title'].lower())
    elif choice == '2':
        priority_map = {"High": 1, "Medium": 2, "Low": 3}
        sorted_list = sorted(tasks, key=lambda x: priority_map.get(x.get('priority', 'Medium'), 2))
    else:
        print("Invalid choice.")
        return
        
    print("\nSorted View:")
    for task in sorted_list:
        prio = task.get('priority', 'Medium')
        print(f"- [{task['id']}] {task['title']} ({prio})")

def main_menu():
    print("\n--- CLI Todo App ---")
    print("1. Add Task")
    print("2. View Tasks")
    print("3. Update Task")
    print("4. Delete Task")
    print("5. Toggle Task Completion")
    print("6. Search Tasks")
    print("7. Filter Tasks")
    print("8. Sort Tasks")
    print("9. Exit")

def main():
    while True:
        main_menu()
        choice = input("Enter choice: ").strip()
        
        if choice == '1':
            add_task()
        elif choice == '2':
            view_tasks()
        elif choice == '3':
            update_task()
        elif choice == '4':
            delete_task()
        elif choice == '5':
            toggle_task_completion()
        elif choice == '6':
            search_tasks()
        elif choice == '7':
            filter_tasks()
        elif choice == '8':
            sort_tasks()
        elif choice == '9':
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please enter 1-9.")

if __name__ == "__main__":
    main()
