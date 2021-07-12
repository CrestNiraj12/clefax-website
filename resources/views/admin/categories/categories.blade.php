@extends('layouts.admin')

@section('content')

<!-- Main content -->
<section class="content">

    <!-- Default box -->
    <div class="card">
    <div class="card-header">
        <div class="card-tools">
            <a href="/admin/categories/add" class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-baseline">
                <i class="fas fa-plus mr-1"></i>
                <span>Add Categories</span>
            </a>
        </div>
    </div>
    <div class="card-body p-0">
        <table class="min-w-max w-full table-auto">
            <thead>
                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th class="py-3 px-6 text-left">
                        Name
                    </th>
                    <th class="py-3 px-6 text-center"></th>
                </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
                @if (count($categories) > 0)
                    @foreach ($categories as $category)
                    @include('admin.categories.modal.delete')
                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left">
                            {{ $category["name"] }}
                        </td>
                        
                        <td class="py-3 px-6 text-center">
                            @if (auth()->user()->role == "Admin")
                            <div class="flex item-center justify-center">
                                <a href="/admin/categories/{{ $category['id'] }}/edit" class="w-4 mr-2 transform hover:text-purple-500 cursor-pointer hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </a>
                                <button class="w-4 mr-2 transform hover:text-red-500 cursor-pointer hover:scale-110 showDelBtn" type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            @endif
                            {{-- <a class="btn btn-info btn-sm" href="/admin/categories/{{ $category['id'] }}/edit">
                                <i class="fas fa-pencil-alt">
                                </i>
                                Edit
                            </a>
                            <form style="display:inline" method="POST" action="{{ route('categories.destroy', $category->id) }}">
                                @method('DELETE')
                                @csrf
                                <button class="btn btn-danger btn-sm" type="submit">
                                    <i class="fas fa-trash">
                                    </i>
                                    Delete
                                </button>
                            </form> --}}
                        </td>
                    </tr>
                    @endforeach
                @else
                <tr class="brequest-b brequest-gray-200 hover:bg-gray-100"><td colspan="5" class="py-3 px-6 text-left">No categories found!</td></tr>
                @endif
            </tbody>
        </table>
        <div class="my-3 mx-3">
            {!! $categories->links() !!}
        </div>
    </div>
    <!-- /.card-body -->
    </div>
    <!-- /.card -->

</section>

<script type="text/javascript">
   window.onload = function() {
        var openmodal = document.querySelectorAll('.showDelBtn');
        for (var i = 0; i < openmodal.length; i++) {
            openmodal[i].addEventListener('click', function(event){
                event.preventDefault();
                toggleModal();
            });
        }
        
        var closemodal = document.querySelectorAll('.cancelDelBtn');
        for (var i = 0; i < closemodal.length; i++) {
            closemodal[i].addEventListener('click', function(event){
                event.preventDefault();
                toggleModal();
            });
        }

        function toggleModal () {
            const body = document.querySelector('body');
            const modal = document.querySelector('#confirmDelModal');
            modal.classList.toggle('opacity-0');
            modal.classList.toggle('invisible');
            modal.classList.toggle('visible');
            modal.classList.toggle('pointer-events-none');
            body.classList.toggle('modal-active');
        }
   }
</script>

<!-- /.content -->
@endsection


